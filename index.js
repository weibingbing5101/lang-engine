const config = require('./app/config.js');
const cheerio = require('cheerio');
const fs = require('fs');



function eachTree(config, parentDom) {
    if (!config.length === 0) {
        console.error('配置文件没有dom结构描述');
        return false;
    }


    return config.forEach((item, index) => {
        var dom = `<${item.tag} class="${item.className ? item.className : ''}">${item.text ? item.text : ''} </${item.tag}>`;
        console.log(dom);
        if (item.child && item.child.length) {
            parentDom.append(dom);
            eachTree(item.child, $(`.${item.className}`));
        } else {
            parentDom.append(dom);
            return
        }
    })
}
var $ = cheerio.load('<div id="app"></div>', { decodeEntities: false });
eachTree(config, $('#app'));
console.log($.html());



fs.writeFile('./index.html', $.html(), function(err) {
    if (err) {
        throw err;
    }

    console.log('Saved.');

    // 写入成功后读取测试
    fs.readFile('./test2.txt', 'utf-8', function(err, data) {
        if (err) {
            throw err;
        }
        console.log(data);
    });
});


























// function eachTree(config,parentDom){
//     if(!config.length === 0){
//         console.error('配置文件没有dom结构描述');
//         return false;
//     }


//     return config.forEach((item, index)=>{
//         var dom = document.createElement(item.tag);
//         dom.className = item.className ? item.className : '';
//         dom.innerHTML = item.text ? item.text : '';
//         if(item.child && item.child.length){
//             parentDom.appendChild(dom);
//             eachTree(item.child, dom);
//         }else{
//             parentDom.append(dom);
//             return
//         }
//     })
// }



// let output = document.body;
// eachTree(config, output);


// console.log(output);