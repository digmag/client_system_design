import { isSupported } from 'firebase/messaging'
import { getToken, getMessaging, deleteToken as dt } from 'firebase/messaging'
import { app } from '../app'

export const messaging = getMessaging(app)
isSupported().then(bool => console.log(bool))

const key = 'BEUGIqjaS0ur6E6SRyOxmVbAmwntK9JGMk7-i-uhNOgISQ6Bixr2i-7RSGhQQPE2z2JRoOl-xcJexkeDLEngBic'

async function registerUser(token: string) {
    const response = await fetch("http://localhost:8080/api/notification/register", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${sessionStorage.getItem('access')}`,
            "firebase-token": token
        }
    })
    if (!response.ok) {
        console.error("Не удалось зарегистрировать")
    }
    return response
}

export const requestPermissions = () => {
    const permissions = Notification.permission
    if (permissions === 'granted') {
        getToken(messaging, { vapidKey: key }).then(token => {
            sessionStorage.setItem('fbToken', token)
            registerUser(token)
        }).catch(err => {
            console.log("не удалось получить токен: ", err)
        })
    }
}

export const sendEvent = async (obj: { type: string, params: any }) => {
    navigator.serviceWorker.ready.then(register => {
        register.active?.postMessage(JSON.stringify(obj))
    }).catch(err => console.error(err))
}

export const deleteToken = () => {
    dt(messaging).then(deleted => console.log(deleted ? "Токен удален" : "Токен не удален")).catch(err => console.error(err))
}