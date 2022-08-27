import Link from "next/link";
import Layout from "../components/layout/layout";
import {getCookie, deleteCookie, setCookie} from 'cookies-next';
import {useEffect, useState} from "react";

import Echo from "laravel-echo";
import Pusher from "pusher-js";
import {getBroadcastMessageEndpoint, SERVER_ENDPOINT} from "../components/core/endpoints";
import AlertComponent from "../components/alerts/alertComponent";
import axios from "axios";
import {useRouter} from "next/router";

import {GetRequest} from "/components/core/api-request"

export default function Dashboard() {

    const [token, setToken] = useState(getCookie('token'));
    const [email, setEmail] = useState(getCookie('email'));
    const [userid, setUserid] = useState(getCookie('id'));
    const [called, setCalled] = useState('');
    const [received, setReceived] = useState('');

    const router = useRouter();

    useEffect(() => {
        const options = {
            broadcaster: "pusher",
            key: "123456_key",
            cluster: "mt1",
            forceTLS: false,
            encrypted: false,
            wsHost: '127.0.0.1',
            wsPort: 6001,
            //authEndpoint is your apiUrl + /broadcasting/auth
            authEndpoint: "http://127.0.0.1:8000/broadcasting/auth",
            // As I'm using JWT tokens, I need to manually set up the headers.
            auth: {
                headers: {
                    Authorization: "Bearer " + token,
                    Accept: "application/json"
                }
            }
        };

        const echo = new Echo(options);

        echo.private(`processDone.`+ userid)
            .listen('ProcessDone', (e) => {
                setReceived('Received');
            });}, [])

    const buildRequestConfig = (token) => ({
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`,
        }
    });

    const executeJobBackend = async () => {
        const url = 'http://127.0.0.1:8000/api/broadcastMessage';
        setCalled('Api was called');
        const result = await GetRequest( url, token);
        result.status === 401 && router.push('/');
    }

    const logout = () => {
        deleteCookie('token')
        router.push('/')
    }

    return (
        <Layout>
            <h1> Dashboard </h1>
            <span onClick={logout}>
                Logout
            </span>
            <button
                onClick={executeJobBackend}
                type={'none'}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-10"
            >
                {'Receive broadcast message'}
            </button>
            <p/>
            {called && <AlertComponent type={'notification'} message={called}/>}
            {received && <AlertComponent type={'notification'} message={received}/>}
        </Layout>
    )
}