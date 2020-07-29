const $siteList = $(".siteList");
const $lastLi = $siteList.find("li.last");
const x = localStorage.getItem("x");
const xObject = JSON.parse(x); //将字符串转换成数组
const hashMap = xObject || [
  {
    logo: "A",
    logoType: "text",
    url: "https://www.acfun.cn",
  },
  {
    logo: "./images/哔哩哔哩.jpg",
    logoType: "image",
    url: "https://www.bilibili.com/",
  },
];
const render = () => {
  $siteList.find("li:not(.last)").remove();

  hashMap.forEach((node) => {
    /*遍历所有节点*/
    const $li = $(`<li>
      <a href="${node.url}">
                <div class="site">
                  <div class="logo">${node.logo[0]}</div>
                  <div class="link">${node.url}</div>
                </div>
              </a>
        </li>`).insertBefore($lastLi);
  });
};
render();
$(".addButton").on("click", () => {
  let url = window.prompt("请输入要添加的网址");
  if (url.indexOf("https") !== 0) {
    url = "https://www." + url;
  }
  console.log(url);
  hashMap.push({
    logo: url[0],
    logoType: "text",
    url: url,
  });

  render();
});
/**关闭页面前将hashmap内容存入到本地仓库 */
window.onbeforeunload = () => {
  const string = JSON.stringify(hashMap); //把hashMap变成字符串
  window.localStorage.setItem("x", string); /**存储到本地仓库 */
};
