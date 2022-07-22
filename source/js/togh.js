(function () {
    var url = window.location.pathname;
    url = url.slice(0, url.length - 1);
    var filename = "https://github.com/operapeking/blog-hexo/blob/master/source/_posts/" + url.substring(url.lastIndexOf('/') + 1, url.length) + ".md";
    var posts = document.getElementsByClassName('post-content');
    var insert = '<a href="' + filename + '" target="_blank">在 Github 中查看</a>';
    posts[0].insertAdjacentHTML('beforeend', insert);
})();