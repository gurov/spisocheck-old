import * as React from 'react';
import { FieldFeedback, FieldFeedbacks, FormWithConstraints } from 'react-form-with-constraints';

interface Props {
}

interface State {
    username: string;
    password: string;
    passwordConfirm: string;
    submitButtonDisabled: boolean;
}

export default class Register extends React.Component<Props, State> {

    form: FormWithConstraints;
    password: HTMLInputElement;

    constructor(props: Props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            passwordConfirm: '',
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
            alert(`Valid form\n\nthis.state =\n${JSON.stringify(this.state, null, 2)}`);
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
                        <label htmlFor="username">Email</label>
                        <input type="email" name="username" id="username"
                               className="u-full-width mb-0"
                               value={this.state.username} onChange={this.handleChange}
                               required minLength={3}/>
                        <FieldFeedbacks for="username" className="input-notes">
                            <FieldFeedback when="tooShort">Минимум 3 символа</FieldFeedback>
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

                    <div className="offset-by-three six columns" >
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
                        <button className="button-primary" disabled={this.state.submitButtonDisabled}>
                            Зарегистрироваться
                        </button>
                    </div>

                </FormWithConstraints>
            </div>
        );
    }
}
