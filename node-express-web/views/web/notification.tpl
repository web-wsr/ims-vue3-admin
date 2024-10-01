{% extends './../layout.tpl' %}


{% block css%}
{% endblock %}


{% block content %}
<div class="page-content">
    <ul class="all-list">
        {% for val in notification%}
        {% if val.state === '已发布' %}
        <li class="all-item">
            <div class="item-index">
                {{ loop.index }}
            </div>
            <div class="item-content">
                <a href="/api/web/notification/{{val.id}}" class="item-title">{{val.title}}</a>
                <span class="item-time">{{val.created_at_display}}</span>
            </div>
        </li>
        {% endif %}
        {% endfor %}
    </ul>
</div>

{% endblock %}