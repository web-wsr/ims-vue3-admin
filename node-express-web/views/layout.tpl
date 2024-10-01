<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{title}}</title>
    <link rel="stylesheet" href="/stylesheets/reset.css">
    <link rel="stylesheet" href="/stylesheets/web.css">
    {% block css%}
    {% endblock %}
</head>

<body>
    <div class="wrapper">
        <div class="page-header">
            <ul>
                <li>
                    <a href="/api/web/index" class="nav-item {% if nav === 'all' %}active{% endif %}">全部</a>
                </li>
                <li>
                    <a href="/api/web/technologyTrends"
                        class="nav-item {% if nav === 'technologyTrends' %}active{% endif %}">技术动态</a>
                </li>
                <li>
                    <a href="/api/web/notification"
                        class="nav-item {% if nav === 'notification' %}active{% endif %}">通知公告</a>
                </li>
                <li>
                    <a href="/api/web/lifeEssays"
                        class="nav-item {% if nav === 'lifeEssays' %}active{% endif %}">生活随笔</a>
                </li>
                <li>
                    <a href="/api/web/technologyHot"
                        class="nav-item {% if nav === 'technologyHot' %}active{% endif %}">科技热点</a>
                </li>
            </ul>
        </div>
        {% block content %}
        {% endblock %}
    </div>
    {% block js %}
    <script src="/javascripts/jquery-3.7.1.min.js"></script>
    {% endblock %}
</body>

</html>