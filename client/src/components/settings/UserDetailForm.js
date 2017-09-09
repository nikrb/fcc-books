import React from 'react';
import PropTypes from 'prop-types';

export default class UserDetailForm extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func,
    onChange: PropTypes.func,
    user: PropTypes.object,
    errors: PropTypes.object
  };
  render = () => {
    const {onSubmit, onChange, user, errors} = this.props;
    return (
      <div className="container" >
        <form action="/" onSubmit={onSubmit} >
          <h2>Change Password</h2>
          {errors.summary && <p className="error-message">{errors.summary}</p>}
          <div>Full Name
            <div className="error-wrap">
              {errors.password && <p className="error-field">{errors.password}</p>}
              <input type="text" name="full_name"
                value={user.full_name} onChange={onChange} />
            </div>
          </div>
          <div>City
            <div className="error-wrap">
              {errors.password && <p className="error-field">{errors.password}</p>}
              <input type="text" name="city"
                value={user.city} onChange={onChange} />
            </div>
          </div>
          <div>State/Province
            <div className="error-wrap">
              {errors.password && <p className="error-field">{errors.password}</p>}
              <input type="text" name="province"
                value={user.province} onChange={onChange} />
            </div>
          </div>
          <div style={{margin:"10px"}}>
            <button type="submit" name="user_detail_save" >Save Changes</button>
          </div>
        </form>
      </div>
    );
  };
}
