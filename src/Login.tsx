import * as React from 'react';
import { FieldFeedback, FieldFeedbacks, FormWithConstraints } from 'react-form-with-constraints';

interface Props {
}

interface State {
    username: string;
    password: string;
    loading: boolean;
    submitButtonDisabled: boolean;
}

export default class Login extends React.Component<Props, State> {

    form: FormWithConstraints;
    password: HTMLInputElement;

    constructor(props: Props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            loading: false,
            submitButtonDisabled: false
        };

        this.handleChange = this.handleChange.bind(this);
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


    handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        this.form.validateFields();

        this.setState({submitButtonDisabled: !this.form.isValid()});

        if (this.form.isValid()) {
            this.setState({loading: true});
            setTimeout(() => {
                alert(`Valid form\n\nthis.state =\n${JSON.stringify(this.state, null, 2)}`);
                this.setState({loading: false});
            }, 2000);

        }
    }

    render() {
        return (

            <div className="container">
                <div className="offset-by-three six columns">
                    <h1>Вход</h1>
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
                               className="u-full-width mb-3"
                               value={this.state.password} onChange={this.handleChange}
                               required/>
                    </div>

                    <div className="offset-by-three six columns">
                        <button className="button-primary"
                                disabled={this.state.submitButtonDisabled || this.state.loading}>
                            Войти {this.state.loading && <img src="loader.gif"/>}
                        </button>
                    </div>

                </FormWithConstraints>
                <hr/>

            </div>
        );
    }
}
