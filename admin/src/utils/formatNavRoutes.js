export default function formatNavRoutes(routes) {
    let result = [];
    routes.forEach((data) => {
        if (data.meta && data.meta.nav) {
            let item = {
                name: data.name,
                meta: data.meta
            };
            if (data.children) {
                item.children = formatNavRoutes(data.children);
            }
            result.push(item);
        } else if (data.children) {
            formatNavRoutes(data.children).forEach((item) => {
                result.push(item);
            });
        }
    });
    return result;
}