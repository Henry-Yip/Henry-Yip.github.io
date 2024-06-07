---
layout: page
title: Posts by Tag
permalink: /tags/
---
<html>
<head>
  <style>
    .center {
      margin: 0 auto;
      width: 100%; 
    }
    .tag-box {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
    .tag-box a {
      margin: 0.5rem;
    }
    ul {
      padding-left: 1rem;
    }
    li {
      list-style-type: none;
    }
    .date {
      font-style: italic;
      color: #666;
      margin-right: 0.5rem;
    }
  </style>
</head>
<body>
  <div class="center">

    {% assign sorted_tags = site.tags | sort %}

    <p class="tag-box">
      {% for tag in sorted_tags %}
        {% if forloop.index <= 5 %}
          {% assign t = tag | first %}
          {% assign posts = tag | last %}
          <a href="#{{ t | downcase }}">[{{ t }}]</a>
        {% endif %}
      {% endfor %}
    </p>

    <p class="tag-box">
      {% for tag in sorted_tags %}
        {% if forloop.index > 5 %}
          {% assign t = tag | first %}
          {% assign posts = tag | last %}
          <a href="#{{ t | downcase }}">[{{ t }}]</a>
        {% endif %}
      {% endfor %}
    </p>

    {% for tag in sorted_tags %}
      {% assign t = tag | first %}
      {% assign posts = tag | last %}
      <h4 id="{{ t | downcase }}">{{ t }}</h4>
      <ul>
        {% for post in posts %}
          {% if post.tags contains t %}
            <li><span class="date">{{ post.date | date: '%d %b %y' }}</span>: <a href="{{ post.url }}">{{ post.title }}</a></li>
          {% endif %}
        {% endfor %}
      </ul>
    {% endfor %}
  </div>
</body>
</html>