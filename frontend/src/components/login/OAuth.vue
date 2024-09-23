<template>
    <div class="form-login__socials">
        <button type="button" class="form-login__social form-login__social--google" @click="loginWithGoogle">
            <font-awesome-icon :icon="['fab', 'google']" />
        </button>
        <button type="button" class="form-login__social form-login__social--facebook">
            <font-awesome-icon :icon="['fab', 'facebook-f']" />
        </button>
        <button type="button" class="form-login__social form-login__social--github">
            <font-awesome-icon :icon="['fab', 'github']" />
        </button>
        <button type="button" class="form-login__social form-login__social--linkedin-in">
            <font-awesome-icon :icon="['fab', 'linkedin-in']" />
        </button>
    </div>
</template>

<script type="module">
import { onMounted } from 'vue';
import axios from 'axios';
import Cookies from 'js-cookie';

export default {
    name: 'OAuth',
    setup() {
        const loginWithGoogle = async () => {
            const apiUrl = import.meta.env.VITE_API_URL.trim().replace(/\/+$/, '');
            try {
                const response = await axios.get(`${apiUrl}/api/auth/google`, { withCredentials: true });
                const { token } = response.data;

                if (token) {
                    Cookies.set('authToken', token, { secure: true, sameSite: 'None', path: '/', httpOnly: true });
                    window.location.href = 'https://code-up-omega.vercel.app/user';
                }
            } catch (error) {
                console.error('Google login failed:', error);
            }
        };

        onMounted(() => {
            const authToken = Cookies.get('authToken');
            if (authToken) {
                window.location.href = 'https://code-up-omega.vercel.app/user';
            }
        });

        return {
            loginWithGoogle,
        };
    }
};
</script>
