export const formatAmount=(amount: number)=>{
    const strAmount = String(amount).split(".")
    const left = strAmount[0] || '00'
    const right = strAmount[1] || '00'
    return Number(`${left}.${right.slice(0,2)}`)
}