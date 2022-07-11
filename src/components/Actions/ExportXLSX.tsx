import { utils, writeFile } from 'xlsx'
import Button from '../UI/Button'

type Props = {
    data: any,
    fileName: string
}

export default function ExportXLSX({ data, fileName }: Props) {

    const handleExport = () => {
        const wb = utils.book_new()
        const ws = utils.json_to_sheet(data)
        utils.book_append_sheet(wb, ws, fileName);
        writeFile(wb, `${fileName}.xlsx`)
    }

    return (
        <Button text='Exportar para XLSX' onClick={handleExport} bg='blue' />
    )
}
