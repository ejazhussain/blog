hexo.extend.tag.register('githubRepo', function (args) {

    var link = args[0];
    return '<a href=' + link +' class="is-primary button is-medium github">< span class="icon is-medium"><i class="fab fa-github"></i></span ><span>Explore solution on GitHub</span></a >';
});

