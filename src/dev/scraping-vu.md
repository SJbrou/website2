---
layout: vscode.njk
title: "Play with strudel"
date: 2026-02-01
tags: ["strudel", "music", "dev"]
---

Inspired by [Switch Angel](https://www.youtube.com/@Switch-Angel), I've been playing arround with [Strudel](https://strudel-lang.org/) and was impressed by how easy it is to create music in the browser. 


{% raw %}

<script src="https://unpkg.com/@strudel/embed@latest"></script>
<strudel-repl>
  <!--
setCpm(10/4)
$: note(`e e f g g f e d c c d e [e -] [- d] d@2
         e e f g g f e d c c d e [d -] [- c] c@2
         d d e c d [e f] e c d [e f] e d c d g2 [- e]
         - e f g g f e d c c d e d [- c] c -
         - - - - - - - - - - - - - - - - -
`).sound("piano")._punchcard()
-->
</strudel-repl>

{% endraw %}

Inspiration:

<iframe width="50%" height="30%" src="https://www.youtube.com/embed/iu5rnQkfO6M" title="Coding Trance Music from Scratch (Again )" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
