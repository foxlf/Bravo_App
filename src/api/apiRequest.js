export default async function apiRequest (URL="", options = null) {
    let err = "";
    try {
        const response = await fetch(URL, options)
        if (!response.ok) throw Error ("Request error")
    } catch (error) {
        err = error
    } finally {
        return err
    }
}