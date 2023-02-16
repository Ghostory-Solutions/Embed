export default {
    async fetch(request, env) {
        const make = `<!doctypehtml><html lang="en"><meta charset="utf-8"><meta content="width=device-width,initial-scale=1"name="viewport"><link href="https://unpkg.com/@picocss/pico@1.*/css/pico.min.css"rel="stylesheet"><title>Embed Maker</title><main class="container"><label for="title">Title <input id="title"name="title"required placeholder="Title"></label> <label for="description">Description <input id="desc"name="description"required placeholder="Description"></label> <label for="imgurl">Image URL <input id="imgurl"name="img"required placeholder="Image URL"type="url"></label> <label for="authname">Author name <input id="authname"name="authname"required placeholder="Author name"></label> <label for="authurl">Author URL <input id="authurl"name="authurl"required placeholder="Author URL"type="url"></label> <label for="color">Color <input id="color"id="color"name="color"required type="color"></label> <button onclick="update()">Update Preview</button><discord-messages><discord-message id="embed"></discord-message></discord-messages></main><script src="https://unpkg.com/@skyra/discord-components-core"type="module"></script><script>const url=new URL('https://embed.arealcattbh.workers.dev/');const embed=document.getElementById("embed");function update(){const info={title:document.getElementById("title").value,desc:document.getElementById("desc").value,imgurl:document.getElementById("imgurl").value,authname:document.getElementById("authname").value,authurl:document.getElementById("authurl").value,color:document.getElementById("color").value};url.searchParams.set("title",info.title);url.searchParams.set("description",info.desc);url.searchParams.set("image",info.imgurl);url.searchParams.set("author_name",info.authname);url.searchParams.set("author_url",info.authurl);url.searchParams.set("color",info.color);embed.innerHTML=\`<a>\${ url }</a><discord-embed slot="embeds" author-name="\${info.authname }" author-url="\${info.authurl }" color="\${info.color }" embed-title="\${info.title }" image="\${info.imgurl }" url="/"><discord-embed-description slot="description">\${info.desc }</discord-embed-description></discord-embed>\`}update();</script>`;
        function embed(params) {
            return `<meta content="${params.get("title")}" property="og:title">

<meta content="${params.get("description")}" property="og:description">

<meta content='${params.get("image")}' property='og:image'>

<link type="application/json+oembed" href="author_data.json?author_name=${params.get("author_name")}&author_url=${params.get("author_url")}" />

<meta name="twitter:card" content="summary_large_image">

<meta name="theme-color" content="#${params.get("color")}">
<meta http-equiv="refresh" content="0;URL=/make>`;
        }
        try {
            const { pathname } = new URL(request.url);
            const params = new URLSearchParams(new URL(request.url).search);
            console.log(pathname);
            if (pathname == "/") {
                return new Response(embed(params), {
                    headers: {
                        "content-type": "text/html;charset=UTF-8",
                    },
                });
            } else if (pathname == "/author_data.json") {
                return new Response(`{ "author_name": "${params.get("author_name")}", "author_url": "${params.get("author_url")}" }`, {
                    headers: {
                        "content-type": "application/json;charset=UTF-8",
                    },
                });
            } else if (pathname == "/make") {
                return new Response(make, {
                    headers: {
                        "content-type": "text/html;charset=UTF-8",
                    },
                });
            } else {
                return fetch("https://http.cat/404")
            }
        } catch (e) {
            return fetch("https://http.cat/500")
        }
    },
};
