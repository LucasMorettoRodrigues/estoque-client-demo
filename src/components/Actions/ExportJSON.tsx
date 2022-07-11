import Button from '../UI/Button'

type Props = {
    data: any,
    fileName: string
}

export default function ExportJSON({ data, fileName }: Props) {

    const handleExport = () => {
        const blob = new Blob([JSON.stringify(data)], { type: 'text/json' })

        const a = document.createElement('a')
        a.download = `${fileName}.json`
        a.href = window.URL.createObjectURL(blob)
        const clickEvt = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true,
        })
        a.dispatchEvent(clickEvt)
        a.remove()
    }
    return (
        <Button text='Exportar para JSON' onClick={handleExport} bg='blue' />
    )
}
