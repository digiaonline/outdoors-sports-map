import React, {Component} from 'react';
import {translate} from 'react-i18next';
import {sendFeedback} from '../actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import SMIcon from '../../home/components/SMIcon';

export class FeedbackModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      emailInputOpen: false,
      feedback: null,
      email: null
    };

    this.handleFeedbackSubmit = this.handleFeedbackSubmit.bind(this);
    this.toggleEmailInput = this.toggleEmailInput.bind(this);
  }

  toggleEmailInput() {

    if (this.state.emailInputOpen) {
      this.setState({emailInputOpen: false});
    } else {
      this.setState({emailInputOpen: true});
    }
  }

  handleFeedbackSubmit(e, feedback, email) {
    e.preventDefault();
    this.props.sendFeedback(feedback);
    this.props.closeModal();
  }

  render() {
    const {closeModal, t} = this.props;
    const {emailInputOpen} = this.state;

    return (
      <div className="about-modal-backdrop">
        <div className="about-modal-box">
          <div className="about-modal-controls">
            <SMIcon icon="close" onClick={() => closeModal()} />
          </div>
          <div className="about-modal-content">
            <h3>{t('MAP.INFO_MENU.GIVE_FEEDBACK')}</h3>
            <form onSubmit={(e) => this.handleFeedbackSubmit(e, this.state.feedback, this.state.email)}>
              <div className="feedback-modal__feedback"><textarea type="text" placeholder={t('MAP.FEEDBACK.FEEDBACK')} rows="7" cols="40" onChange={(e) => this.setState({feedback: e.target.value})}/></div>
              <div>
                <label>
                  <input className="feedback-modal__checkbox" type="checkbox" onChange={() => this.toggleEmailInput()} />
                  {t('MAP.FEEDBACK.WANT_ANSWER')}
                </label>
              </div>
              {emailInputOpen && <div className="feedback-modal__email"><input type="text" onChange={(e) => this.setState({email: e.target.value})}/></div>}
              <button type="submit">{t('MAP.FEEDBACK.SEND')}</button>
            </form>
          </div>
        </div>
      </div>);
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({sendFeedback}, dispatch);

export default connect(null, mapDispatchToProps)(translate()(FeedbackModal));
