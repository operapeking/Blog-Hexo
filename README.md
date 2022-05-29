# blog-hexo

基于 [Hexo](https://github.com/hexojs/hexo)，使用 [Fluid](https://github.com/fluid-dev/hexo-theme-fluid) 主题的博客。

主要包含 `C++` 实现的算法以及一些软件使用教程。

## 文章风格

* 小写文件名，尽量使用全称。如 `segment-tree.md`、`luogu-p1001.md`。
* 图片保存在 `source/img/<对应 markdown 文件名>/` 文件夹内
* 在 `Markdown` 文件头部添加 [Front-matter](https://hexo.io/zh-cn/docs/front-matter) 并填写适当的内容。
* 在 `Markdown` 文件正文开始前添加 [摘要](https://hexo.fluid-dev.com/docs/guide/#文章摘要)。

具体实例可在 `source/_posts` 中找到。

## Pull Request

1. [Fork](https://github.com/operapeking/blog-hexo/fork) 本仓库。
2. 添加/修改 `source/_posts/` 中的内容。
3. 添加 [Pull Request](https://github.com/operapeking/blog-hexo/pulls)，并标明修改的内容。