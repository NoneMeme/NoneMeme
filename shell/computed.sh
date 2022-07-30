#! /bin/bash
echo 'export default {
  count: '"$(ls ./meme -l |grep "^-"|wc -l)"',
  items: [
    "'"$(echo "$(ls -d meme/*)" | sed ':a;N;$!ba;s/\n/",\n    "/g')"'"
  ]
}' > ./static/scripts/config.js
