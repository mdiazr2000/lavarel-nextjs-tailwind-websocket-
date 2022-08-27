import Link from "next/link";
import Head from "next/head";
import Layout from "../layout/layout";
import {useState} from "react";
import { useRouter } from 'next/router'
import {getLoginEndpoint, getMeEndpoint} from "../core/endpoints";
import axios from "axios";
import { setCookie } from 'cookies-next';
import AlertComponent from "../alerts/alertComponent";
import {PostWithoutTokenRequest, PostRequest} from "../core/api-request"

const fixedInputClass="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"

export default function Login(props) {

    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const login = async function () {
        if (!email || !password) {
            setError('Fill the required fields');
            return;
        }
        const url = getLoginEndpoint();
        const result = await PostWithoutTokenRequest(url , {
            'email' : email,
            'password' : password
        });
        if (result.status !== 200 && result.data) {
            setError(result.data.error);
        }
        if (result.status === 200 && result.data.access_token !== undefined) {
            const urlMe = getMeEndpoint();

            const resultMe = await PostRequest(urlMe, null, result.data.access_token);

            if (resultMe.status == '200') {
                setCookie('token', result.data.access_token)
                setCookie('email', resultMe.data.email)
                setCookie('id', resultMe.data.id)
                router.push('/dashboard')
            }

        }

    }

    return (
        <Layout>
            <Head>
                <title>Login Page</title>
            </Head>
            <div className="mb-10">
                <div className="flex justify-center">
                    <img
                        alt=""
                        className="h-14 w-14"
                        src="https://ik.imagekit.io/pibjyepn7p9/Lilac_Navy_Simple_Line_Business_Logo_CGktk8RHK.png?ik-sdk-version=javascript-1.4.3&updatedAt=1649962071315"/>
                </div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    {props.labelText}
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600 mt-5">
                    {props.dontHave} {' '}
                    <Link href='/auth/signup' className="font-medium text-purple-600 hover:text-purple-500">
                        Signup
                    </Link>
                </p>
            </div>
            {error && <AlertComponent type={'danger'} message={error}/>}
            <div className="my-5">
                <label htmlFor={'usernameInput'} className="sr-only">
                    {'Username'}
                </label>
                <input
                    id={'usernameInput'}
                    value={email}
                    onChange={(event) => {
                        setEmail(event.target.value);
                    }}
                    type={'text'}
                    required={true}
                    className={fixedInputClass}
                    placeholder={'Enter username'}
                />
            </div>
            <div className="my-5">
                <label htmlFor={'passwordInput'} className="sr-only">
                    {'Username'}
                </label>
                <input
                    id={'passwordInput'}
                    value={password}
                    onChange={(event) => {
                        setPassword(event.target.value);
                    }}
                    type={'password'}
                    required={true}
                    className={fixedInputClass}
                    placeholder={'Enter password'}
                />
            </div>
            <button
                type={'none'}
                onClick={login}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-10"
            >
                {'Login'}
            </button>
        </Layout>

    );
}