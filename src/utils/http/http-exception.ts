import { HttpException, HttpStatus } from "@nestjs/common";

export class HttpExceptionUtils extends HttpException {
    constructor(e: any = null) {
        console.log(e.message)
        if (e != null && e.code === 11000 && e.errmsg.includes('index: ')) {
            const errorParsed = e.errmsg.split('index: ')[1].split(' dup key: ')[1].replace('{', '').replace('}', '').replaceAll(' ', '');
            super({ statusCode: 400, message: `${errorParsed} existe déjà`, error: 'Duplicate error' }, HttpStatus.BAD_REQUEST);
        } else if (e.name === 'DocumentNotFoundError') {
            super({ statusCode: 404, message: 'Document introuvable', error: 'Not found' }, HttpStatus.NOT_FOUND);
        }
        else if (e.code === "ER_DUP_ENTRY") {
// console.log(e.message.split('ER_DUP_ENTRY: ')[1].split("'"))
const errorCustom= e.message.split('ER_DUP_ENTRY: ')[1].split("'")[0]+" : "+e.message.split('ER_DUP_ENTRY: ')[1].split("'")[1]


            super({ statusCode: 400, message: errorCustom, error: 'Bad Request' }, HttpStatus.BAD_REQUEST);

        }

        else {
            super({ statusCode: 400, message: e.message, error: 'Bad Request' }, HttpStatus.BAD_REQUEST);
        }
    }
}
