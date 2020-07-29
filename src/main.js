const $siteList = $(".siteList");
const $lastLi = $siteList.find("li.last");
const x = localStorage.getItem("x");
const xObject = JSON.parse(x); //将字符串转换成数组
const hashMap = xObject || [
  {
    logo: "A",
    url: "https://www.acfun.cn",
  },
  {
    logo: "B",
    url: "https://www.bilibili.com/",
  },
];
const simplifyUrl = (url) => {
  return url
    .replace("https://", "")
    .replace("http://", "")
    .replace("www.", "")
    .replace("//.*/", "");
  /*上面最后一个replace是正则表达式将url中/后面的内容删除，这个"\/"是/的转义，这的/是.com后面的/ */
};
const render = () => {
  $siteList.find("li:not(.last)").remove();

  hashMap.forEach((node, index) => {
    /*遍历所有节点*/
    const $li = $(`<li>
      
                <div class="site">
                  <div class="logo">${simplifyUrl(
                    node.url
                  )[0].toUpperCase()}</div>
                  <div class="link">${simplifyUrl(node.url)}</div>
                  <div class="close"> <svg class="icon" >
                  <use xlink:href="#icon-close"></use>
              </svg></div>
                </div>
        </li>`).insertBefore($lastLi);
    $li.on("click", () => {
      window.open(node.url); //跳转到相应页面
    });
    $li.on("click", ".close", (e) => {
      console.log("点击了x");
      e.stopPropagation(); //点击close的x也会跳转到相应页面
      //stopPropagation()则阻止冒泡机制（由内向外）
      hashMap.splice(index, 1); //删除hashmap中index位置的1个元素
      render(); //删除后重新渲染hashMap
    });
  });
};
render();
$(".addButton").on("click", () => {
  let url = window.prompt("请输入要添加的网址");
  if (url.indexOf("https") !== 0) {
    url = "https://" + url;
  }
  console.log(url);
  hashMap.push({
    logo: simplifyUrl(url)[0].toUpperCase(),
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
