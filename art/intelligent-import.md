# 智能导入

- 群友：

    ```python
    from nonebot.adapters.onebot.v11 import MessageSegment
    ```

- 萌新：懂了

    ```python
    from nonebot.adapters import MessageSegment
    ```

- 大脑：

    ```python
    from nonebot.adapters.onebot.v11 import MessageSegment
    ```

- 手：懂了

    ```python
    from nonebot.adapters import MessageSegment
    ```

- VSCode:

    ```python
    # MessageSegment （Ctrl+. 应用代码操作）
    from nonebot.adapters import MessageSegement
    ```

- IDE 的自动导入也就内置函数好用，别的都要自己改
- PyCharm 也一个吊样，init里没有，还是要导入
- 是 VSC 才这样（
- PyC 的智能 auto import 比 VSC 这边好很多，用久了 PyC 会学乖的
    > 这是真的，我之前改了相对导入，后面导入的全给我变了
- PyC 好歹不会给你乱导，VSC 那是想导啥就给你导了
- VSC 你就看看 import 多少回给我导成 `import imp` 就知道了，这不是不学乖的问题（
- 请选择您的导师（

    ![请选择您的导师](/static/image/5F5A87308FF774B02DCCC87C5305BE25.png)

- 就是不见nonebot（
- PyC 也差不多这样，你去导入 `logger`，除了 `nonebot.logger`，还有一大堆（
- PyC 会学习的，你导入多了 PyC 就记住你的喜好了
    > CPU：99%
- 有一大堆是正常的，把奇怪的东西排前面，没有你想要的才是不正常（
- 但是 VSC 是能给你干出 `from re import I` 这种事的
- 还有 `from re import S`
    > 草，不会吧，好像没遇到过
    >
    > > 你打一个大写的 `S`，然后回车试试
- `re` 包里好像的确有 `S` `I`
- 把自动导入关掉（）
- 我经常被自动导入弄得血压高
