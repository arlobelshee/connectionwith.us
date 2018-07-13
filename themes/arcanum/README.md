# Arcanum

Arcanum is a responsive theme for a company. It is an alchemical combination of several themes and ideas. Notable influences include Nederburg, Future Imperfect, Airspace, and lots of steampunk art from Deviant Art.

## Table of Contents

<!-- TOC depthFrom:2 depthTo:6 withLinks:1 updateOnSave:1 orderedList:0 -->

- [Table of Contents](#table-of-contents)
- [Getting Started](#getting-started) - [exampleSite](#examplesite) - [config.toml](#configtoml) - [Hugo's Built-In Server](#hugos-built-in-server)
  - [Hugo's website SEO](#hugos-website-seo)
- [Shortcodes](#shortcodes) - [fancybox](#fancybox) - [img-post](#img-post) - [img-fit](#img-fit) - [url-link](#url-link)
- [About the Author](#about-the-author)
- [License](#license)

<!-- /TOC -->

## Getting Started

<!-- Run the following commands in your Hugo site directory:

```
mkdir themes
cd themes
git clone https://github.com/jpescador/hugo-future-imperfect.git
``` -->

You have access to the theme at `themes/arcanum` from within
your project folder.

### exampleSite

Within the `arcanum` folder, there will be a folder called `exampleSite`. The structure of the folder will look like this:

```
exampleSite
├── config.toml
├── content
│   ├── about
│   │   └── _index.md
│   ├── blog
│   │   ├── some-blog-post-name
│   │   │   ├── _index.md
│   │   │   └── cover.jpg
│   │   └── another-post
│   │        ├── _index.md
│   │        ├── other-image-used-in-post.jpg
│   │        └── cover.jpg
│   ├── contact
│   │   └── _index.md
│   ├── services
│   │   └── _index.md
│   ├── past-work
│   │   └── _index.md
│   └── itemized (perhaps?)
│       ├── item1.md
│       ├── item2.md
│       ├── item3.md
│       └── item4.md
├── data
│   └── comments
│       └── .gitkeep
└── static
    ├── css
    │   └── add-on.css
    ├── img
    │   └── logo.jpg
    └── js
          └── add-on.js
```

Copy `config.toml` from `exampleSite` to the root directory of your Hugo site.

### config.toml

This file is the main sorce of customization within the theme. Each parameter has a comment included to explain its functionality. Typical usage of `true` means to turn a function on, while `false` means to turn a function off.

This file consists of five main sections. The first section contains the site wide parameters innate to Hugo. The second section, `[params]`, contains site wide parameter that are custom to the `arcanum` theme. The third section, `[params.intro]` and `[params.postAmount]`, control aspects
of the sidebar. The fourth section, `[[menu.main]]`, sets the navigation menu items. Lastly, the fifth section, `[social]`, allows you to easily link to and include various social platforms.

### Hugo's Built-In Server

Run the following command to start a local server and to view a live version of
the website:

```
hugo server --disableFastRender
```

You will then be able to view your live website at [localhost:1313](http://localhost:1313).

### Hugo's website SEO

This theme supports SEO elements for your website. It was adapted and integrated thanks to the following guide: [https://keithpblog.org/post/hugo-website-seo/](https://keithpblog.org/post/hugo-website-seo/)

If you wish to enable SEO on this theme, follow these instructions:

1.  Include the following parameters in your `config.toml`

```
# .config.toml
...
enableRobotsTXT = true
canonifyURLs = true
# and if you think your md file names or locations might change:
[permalinks]
    post = "/blog/:title/"
...
```

2.  Add your website to Google Search Console:

    - Login to the [Google Search Console](https://www.google.com/webmasters/tools/home)
    - Add your website as a property
    - Add the html page as required by google to verify ownership
    - Submit the sitemap (/sitemap.xml) for indexing
    - Wait

3.  Add your website to Bing
    - Login to the [Bing Webmaster Console](https://www.bing.com/toolbox/webmaster/)
    - Add your site, details and verify
    - From the 3 options, we recommend adding the xml file to you website

## Shortcodes

In addition to the native [Hugo shortcodes](https://gohugo.io/extras/shortcodes/),
the theme also includes the following codes that I hope you find useful:
fancybox, img-post, img-fit, and url-link.

### fancybox

[Fancybox](http://fancyapps.com/fancybox/3/) is a jQuery lightbox script for displaying images, videos and more. It is touch
enabled, responsive and fully customizable. The commands are shown below:

**Named**

```
{{< fancybox path="path" file="file" caption="caption" gallery="gallery" >}}
```

**Positional**

```
{{< fancybox "path" "file" "caption" "gallery" >}}
```

Please refer to `layouts/shortcodes/fancybox.html` for more details.

Credit: [pacollins]

---

### img-post

Add an image which can be aligned center, left, or right. The commands are shown below:

**Named**

```
{{< img-post path="date" file="filename.jpg" alt="Alt Text" type="left" >}}
```

**Positional**

```
{{< img-post "title" "filename.jpg" "Alt Text" "left" >}}
```

Please refer to `layouts/shortcodes/img-post.html` for more details.

Credit: [jpescador]

---

### img-fit

Insert multiple images with the ability to create a gallery if needed. The command is shown below:

**Positional Only**

```
    {{< img-fit
        "4u" "filename1.jpg" "Alt text 1"
        "4u" "filename2.jpg" "Alt text 2"
        "4u$" "filename3.jpg" "Alt text 3"
        "date" >}}
```

Please refer to `layouts/shortcodes/img-fit.html` for more details.

Credit: [jpescador]

---

### url-link

Create a hyperlink and set a target value for the link. The default value is
`_blank`. The command is shown below:

**Positional Only**

```
{{< url-link "title" "www.link.com" "target">}}
```

Please refer to `layouts/shortcodes/url-link.html` for more details.

Credit: [jpescador]

## About the Author

Arcanum was merged together by [Arlo Belshee](https://arlobelshee.com) from many ideas.

Send Arlo a tweet [@arlobelshee](https://twitter.com/arlobelshee), if you like the theme and are using it.

## License

This theme is released under the MIT license. Please read the [license](LICENSE.md) for more information.

[jpescador]: https://github.com/jpescador
[pacollins]: https://github.com/pacollins
