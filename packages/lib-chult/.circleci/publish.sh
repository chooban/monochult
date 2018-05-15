#! /bin/bash

vercomp () {
  if [[ $1 == "$2" ]]; then
    return 0
  fi

  local IFS=.
  local i ver1=($1) ver2=($2)
  # fill empty fields in ver1 with zeros
  for ((i=${#ver1[@]}; i<${#ver2[@]}; i++)); do
    ver1[i]=0
  done
  for ((i=0; i<${#ver1[@]}; i++)); do
    if [[ -z ${ver2[i]} ]]; then
      # fill empty fields in ver2 with zeros
      ver2[i]=0
    elif ((10#${ver1[i]} > 10#${ver2[i]})); then
      return -1
    elif ((10#${ver1[i]} < 10#${ver2[i]})); then
      return 1
    fi
  done
  return 0
}

DRY_RUN=""
LOCAL="$(npm --silent run currentversion)"
DEPLOYED="$(npm show . version)"
GIT_COMMIT_DESC="$(git log --format=oneline -n 1 $CIRCLE_SHA1)"

while getopts 'd' flag; do
  case "${flag}" in
    d) DRY_RUN='--dry-run'
      ;;
    *) echo "Unrecognised flag: ${flag}"
      ;;
  esac
done

if [[ $GIT_COMMIT_DESC =~ .*npm\ skip.* || $GIT_COMMIT_DESC =~ .*skip\ npm.* ]]; then
  echo "Found [npm skip] so not deploying"
  exit 0
fi

echo "Local version is ${LOCAL}, deployed version is ${DEPLOYED}"

vercomp "${LOCAL}" "${DEPLOYED}"
case $? in
  -1)
    echo "Version manually bumped to ${LOCAL}"
    npx release-it "${LOCAL}" -n "${DRY_RUN}"
    ;;
  0)
    echo "Versions match. Bumping patch..."
    npx release-it -n --verbose "${DRY_RUN}"
    ;;
  1)
    echo "Sorry, rollback not supported"
    exit 0
    ;;
esac

