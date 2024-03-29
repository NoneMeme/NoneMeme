# 饭馆

下面是一个关于异步的比喻：

> 比如说你去饭馆吃饭，点完餐干等着拿饭这是同步，这个时候别人也打不了饭这叫阻塞
>
> 点餐完前台给你个单子，等到叫到单号去取饭就是异步
>
> 这个单子在 Python 里面叫 coroutine（协程），以 async 声明的函数会立即返回一个协程对象，await 模拟的则是等叫号取饭的过程

然后……

- 你的单子弄丢了，然后你发现自己的菜被服务员倒掉，这叫 GC（Garbage Collection，垃圾回收）
- 你在厨房装了一个炸弹，只需要做菜就能触发，你不必吃上菜
- 你的单子丢了，然后你跑到群里吐槽饭店离谱，这叫无理取闹
- 你在饭店订了一个位，又一直不告诉饭店取消了，这叫内存泄漏
- 你坐了不属于你的座位，这叫 Page fault
- 你找了一堆人去饭店点餐，点完就走 这叫 DDoS 攻击
- 饭店不接受你换座位，把你赶了出来，这叫 Segmentation fault
- 你接受了别人的委托帮忙带饭，这叫代理
- 你把菜夹进盘子里，这叫 buffering（缓冲）
- 饭馆老板增加了成百上千个营业窗口，这叫高并发
- 你在等菜，别人也在等菜，但叫号的屏幕同时只能塞一个人看，这是 GIL（Global Interpreter Lock，全局解释器锁）
- 饭馆老板雇用了一个会多国语言的服务员为外国顾客服务，这是 i18n（internationalization，国际化）
- 饭馆老板根据不同地区的顾客选用不同地区的食材做同样的饭菜，这是跨平台
- 老板发现菜单上的菜得去别的餐馆进货 但下一家的老板也发现这菜他家没有，还得去别家点，这叫回调地狱
- 饭馆需要不同的供货商，供货商自己也需要供货商，每个供货商从别的供货商那里需要的东西还有细微的差别，这叫依赖地狱
- 饭馆为一道菜做出了改进，但不知道好不好，在顾客点这道菜的时候，会随机给顾客改进之前的和经过改进的，这叫 A/B 测试
- 饭馆为一道菜做出了多个改进，每个改进独立进行，改进完成后升级菜品，这叫版本管理
- 在用户吃饭的时候更新加菜，这叫做滚动更新
- 在用户吃饭的时候删掉一道菜，结账的时候发现那道菜找不到了，这叫 Bug
- 一位员工将所有食材销毁然后逃跑，这叫删库跑路
- 饭馆把 1 道菜分给 10 个用户吃，这叫做业务超开
- 一位厨师独自钻研改进菜肴，这叫造轮子
- 两个厨师，一个需要用锅做第一步，烤箱做第二步，另一个需要烤箱做第一步，锅做第二步，现在两个厨师都完成了第一步，但是第二步无法操作了，这叫死锁
- 一位饭馆的经理总会在客人声音大的时候把他们锁在冰箱里一个小时，他是 Aspirin

    > Aspirin: 别尬黑，现在 12 小时

- 一位厨师因理念冲突辞职后新开了一家饭馆，这叫 Fork
- 所有的厨师都在忙于制作九转大肠而无法正常处理点菜请求，这叫过载
- 因为菜品涉及侵权，所有做这道菜的饭馆都被连带关店，这叫 DMCA Takedown
