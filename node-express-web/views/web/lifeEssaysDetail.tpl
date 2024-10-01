{% extends './../layout.tpl' %}


{% block css%}
{% endblock %}


{% block content %}
<div class="article-wrapper">
    <div class="article-container">
        <div class="article-title">{{articleDetail.title}}</div>
        <div class="article-time">{{articleDetail.created_at_display }}</div>
        <div class="article-content">
            {{ articleDetail.content | safe }}
        </div>
    </div>
</div>
{% endblock %}