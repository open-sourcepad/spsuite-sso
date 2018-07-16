export class User {

  public full_name;
  public birthday;
  public age;
  public gender;
  public city;
  public access_token;
  public id;
  public password;
  public email;
  public role;

  constructor(
    fields?: {
    full_name?: string,
    birthday?: string,
    city?: string,
    address?: string,
    access_token? :string,
    id? :number,
    age?: number}) {
     if (fields) Object.assign(this, fields);
  }

  loginControls() {
    return {
      email: {
        label: 'Email',
        value: this.email || '',
        type: 'email',
        enabled: true,
        validation: {
          required: true,
          email: true
        }
      },
      password: {
        label: 'Password',
        value: this.password || '',
        type: 'password',
        enabled: true,
        validation: {
          required: true
        }
      },
    }
  }

  formControls() {
    return {
      id: {
        value: this.id || null,
        type: 'text',
        hidden: true,
      },
      full_name: {
        label: 'Full Name',
        value: this.full_name || '',
        type: 'text',
        enabled: true,
        validation: {
          required: true
        }
      },
      email: {
        label: 'Email',
        value: this.email || '',
        type: 'text',
        enabled: true,
        validation: {
          required: true,
          email: true
        }
      },
      password: {
        label: 'Password',
        value: this.password || '',
        type: 'password',
        enabled: true
      },
      role: {
        label: 'Role',
        value: this.role || '',
        enabled: true,
        type: 'select',
        options: [
          { label: "Admin", value: 'Admin'},
          { label: "Labeler", value: 'Labeler'}
        ],
        validation: {
          required: true
        }
      }
    }
  }
}
