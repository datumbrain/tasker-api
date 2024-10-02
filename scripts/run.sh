PROJECT_NAME=tdd_tasker
while getopts "b" opt; do
  case $opt in
  b) SHOULD_BUILD=true ;;
  esac
done

if [ ! -f $BINARY ] || [ -n "$SHOULD_BUILD" ]; then
  echo "Building $PROJECT_NAME..."
  node ./index.js || exit 1
fi

echo "Press CTRL+C to exit.."
$BINARY
