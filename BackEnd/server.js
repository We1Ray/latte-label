const app = require('./app');
const port = 8080;

// 檢查ES版本，若不支援 replaceAll，就加入自定
try {
  let k = 'replaceAll supported'
  console.log(k.replaceAll('a', 'a'))
} catch(err) {
  console.log("replaceAll not supported :(")
  String.prototype.replaceAll = function (target, payload) {
    let regex = new RegExp(target, 'gm')
    return this.valueOf().replace(regex, payload)
  };
}

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
