class ImageJudger {
    private judgingFile: File

    constructor(file: File) {
        if(file != undefined && Object.prototype.toString.call(file) === '[object File]') {
            // console.log('create judger success')
            this.judgingFile = file
        }
        else {
            throw new TypeError("ImageJudger类构造器缺少File对象类型的参数");
        }
    }

    private getHeader(size: number) {
        let header = ''
        const fileReader = new FileReader()
        return new Promise(resolve => {
            fileReader.readAsArrayBuffer(this.judgingFile)
            fileReader.onload = (event) => {
                const arr = new Uint8Array(event.target?.result as ArrayBuffer).subarray(0, size)
                
                for (let index = 0; index < arr.length; index++) {
                    const element = arr[index];
                    header += element.toString(16)
                }                
                resolve(header)
            }
            
        })
    }

    private isJPG(imageHeader: string) {      
        if(imageHeader === 'ffd8ffe0') {
            return true
        }
        return false
    }

    private isPNG(imageHeader: string) {
        if(imageHeader === '89504e47') {
            return true
        }
        return false
    }

    private isGIF(imageHeader: string) {
        if(imageHeader === '47494638') {
            return true
        }
        return false
    }

    private isWEBP(imageHeader: string) {
        if(imageHeader === '52494646') {
            return true
        }
        return false
    }

    private ImageType(imageHeader: string) {
        let imageType = ''
        if(this.isJPG(imageHeader)) {
            imageType = 'JPG'
        }
        else if (this.isPNG(imageHeader)) {
            imageType = 'PNG'
        }
        else if (this.isGIF(imageHeader)) {
            imageType = 'GIF'
        }
        else if (this.isWEBP(imageHeader)) {
            imageType = 'WEBP'
        }
        else {
            imageType = 'not common image'
        }
        return imageType
    }

    getImageType(callback: Function) {
        this.getHeader(4).then(value => {
            let ImageType = this.ImageType(<string> value)
            callback(ImageType)
        })
    }
}

export { ImageJudger }