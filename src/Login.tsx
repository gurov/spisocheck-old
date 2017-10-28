import * as React from 'react';

export default class Login extends React.Component {
    render() {
        return (
            <div>
                <div className="container">

                    <form>

                        <div className="row">
                            <div className="offset-by-three six columns">
                                <h1>Вход</h1>
                            </div>
                            <div>
                                <img src="loader.gif"/>
                            </div>
                            <div className="offset-by-three six columns">
                                <label>Твой email</label>
                                <input className="u-full-width" type="email" placeholder="test@mailbox.com"/>
                            </div>
                            <div className="offset-by-three six columns">
                                <label>Твой пароль</label>
                                <input className="u-full-width" type="password"/>
                            </div>
                            <div className="offset-by-three six columns">
                                <button className="button-primary">
                                    Войти <img src="loader.gif"/>
                                </button>
                            </div>
                        </div>
                    </form>

                </div>

            </div>
        );
    }
}
