(function () {
    var url = window.location.pathname;
    url = 'https://masterd.tk:83' + url;
    var posts = document.getElementsByClassName('post-content');
    var insert = '<a href="' + url + '">在镜像网站中查看</a><br><br>';
    posts[0].insertAdjacentHTML('afterbegin', insert);
})();