# imageJudger
通过图片文件的魔数来异步地获取文件的真实类型

## 使用方法

1、将 ImageJudger.ts 文件移动至您项目的某个位置

2、在您需要的模块中引入
```
import { ImageJudger } from './ImageJudger' // 单引号中填写此 ImageJudger.ts 文件的相对路径
```

3、在您需要的模块中使用
```
let imageJuder = new ImageJudger(File) // File为文件类型的变量

imageJuder.getImageType((imageType) => {
  console.log(imageType);
})
```
