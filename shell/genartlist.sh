#!/usr/bin/env bash

direrr() {
    echo -e "\e[41m[ERROR] You should run me under \e[1;33mthe root of this repository.\e[0m"
    exit 1
}

[[ -d "art" ]] || direrr
[[ -d "text" ]] || direrr

echo "Generating article directory..."

cat > "text/index.html" <<EOF
<!DOCTYPE html>
<html lang="zh">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="NoneBot 群大佬们的日常">
    <link rel="icon" href="../static/favicon.ico">
    <title>NoneBot 梗 | NoneBot 群大佬们的日常</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@1.5.0/css/pico.min.css">
    <link rel="stylesheet" href="../static/style.css">
    <style>
        #view {
            text-align: left;
        }
    </style>
</head>

<body>
    <main class="container">
        <a href="../index.html"><h1>NoneBot 梗</h1></a>
        
        <h5 id="description"></h5>
        <article id="view">
            <github-md>
> 这里收集了一些 NoneBot 相关的文字梗。
>
> 祝各位愉快！

EOF

for doc in art/*.md
do
    echo Adding "'${doc:4:-3}'" ...
    title="$(head -n1 "$doc")"
    echo "- [${title:2}](./${doc:4:-3}.html)" >> "text/index.html"
done

cat >> "text/index.html" <<EOF
            </github-md>
        </article>

        <footer id="footer">
            <p>· NoneBot 闲聊群 · 堂堂连载 ·</p>
            <p><a href="https://github.com/NoneMeme/NoneMeme">看完了吗？感兴趣的话， 可以来 GitHub 投稿哦！</a></p>
        </footer>
    </main>
</body>
<script src="https://cdn.jsdelivr.net/gh/MarketingPipeline/Markdown-Tag/markdown-tag.js"></script> 

</html>
EOF