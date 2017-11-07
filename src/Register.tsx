import * as React from 'react';
import { FieldFeedback, FieldFeedbacks, FormWithConstraints } from 'react-form-with-constraints';
import { Link } from 'react-router-dom';
import * as firebase from 'firebase';

interface Props {
}

interface State {
    email: string;
    password: string;
    passwordConfirm: string;
    displayName: string;
    loading: boolean;
    submitButtonDisabled: boolean;
}

export default class Register extends React.Component<Props, State> {

    form: FormWithConstraints;
    password: HTMLInputElement;

    constructor(props: Props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            passwordConfirm: '',
            displayName: '',
            loading: false,
            submitButtonDisabled: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const target = e.currentTarget;

        this.form.validateFields(target);

        this.setState({
            [target.name as any]: target.value,
            submitButtonDisabled: !this.form.isValid()
        });
    }

    handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.form.validateFields('passwordConfirm');

        this.handleChange(e);
    }

    handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        this.form.validateFields();

        this.setState({submitButtonDisabled: !this.form.isValid()});

        if (this.form.isValid()) {
            this.setState({loading: true});
            this.setState({loading: true});

            firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then(() => {
                    const user = firebase.auth().currentUser;
                    if (user) {
                        user.updateProfile({
                            displayName: this.state.displayName,
                            photoURL: null
                        }).then(function () {
                            alert('Good');
                        }).catch(error => {
                            alert(`Update display name failed\n\nCode: ${error.code}\nMessage: ${error.message}`);
                        });
                    }
                })
                .catch(error => {
                    alert(`Login failed\n\nCode: ${error.code}\nMessage: ${error.message}`);
                })
                .then(() => this.setState({loading: false}));

        }
    }

    render() {
        return (

            <div className="container">
                <div className="offset-by-three six columns">
                    <h1>Регистрация</h1>
                </div>
                <FormWithConstraints
                    ref={(formWithConstraints: any) => this.form = formWithConstraints}
                    className="row"
                    onSubmit={this.handleSubmit}
                    noValidate>
                    <div className="offset-by-three six columns">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email"
                               className="u-full-width mb-0"
                               value={this.state.email} onChange={this.handleChange}
                               required minLength={3}/>
                        <FieldFeedbacks for="email" className="input-notes">
                            <FieldFeedback when="tooShort">Минимум 3 символа</FieldFeedback>
                            <FieldFeedback when="*"/>
                        </FieldFeedbacks>
                    </div>

                    <div className="offset-by-three six columns">
                        <label htmlFor="displayName">Отображаемое имя</label>
                        <input type="text" name="displayName" id="displayName"
                               className="u-full-width mb-0"
                               value={this.state.displayName} onChange={this.handleChange}
                               required minLength={1}/>
                        <FieldFeedbacks for="displayName" className="input-notes">
                            <FieldFeedback when="tooShort">Минимум 1 символ</FieldFeedback>
                            <FieldFeedback when="*"/>
                        </FieldFeedbacks>
                    </div>

                    <div className="offset-by-three six columns">
                        <label htmlFor="password">Пароль</label>
                        <input type="password" name="password" id="password"
                               ref={password => this.password = password!}
                               className="u-full-width mb-0"
                               value={this.state.password} onChange={this.handlePasswordChange}
                               required pattern=".{6,}"/>
                        <FieldFeedbacks for="password" show="all" className="input-notes">
                            <FieldFeedback when="valueMissing"/>
                            <FieldFeedback when="patternMismatch">Минимум 6 символов</FieldFeedback>
                        </FieldFeedbacks>
                    </div>

                    <div className="offset-by-three six columns">
                        <label htmlFor="password-confirm">Повторите пароль</label>
                        <input type="password" name="passwordConfirm" id="password-confirm"
                               className="u-full-width mb-0"
                               value={this.state.passwordConfirm} onChange={this.handleChange}/>
                        <FieldFeedbacks for="passwordConfirm" className="input-notes">
                            <FieldFeedback when={value => value !== this.password.value}>
                                Пароли не совпадают
                            </FieldFeedback>
                        </FieldFeedbacks>
                    </div>
                    <div className="offset-by-three six columns">
                        <button className="button-primary"
                                disabled={this.state.submitButtonDisabled || this.state.loading}>
                            Зарегистрироваться {this.state.loading && <img src="loader.gif"/>}
                        </button>
                    </div>
                </FormWithConstraints>
                <hr/>
                <div className="offset-by-three six columns">
                    Уже есть аккаунт? <Link to="login">Войти</Link>
                </div>
            </div>
        );
    }
}
