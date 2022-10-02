import {Component} from 'react'
import './App.css'

import {v4 as uuidv4} from 'uuid'

const domainInitialBackgroundColorClassList = [
  'domain-initial-background-violet',
  'domain-initial-background-gold',
  'domain-initial-background-green',
  'domain-initial-background-orange',
  'domain-initial-background-jade',
  'domain-initial-background-red',
  'domain-initial-background-blue',
]

const RANDOM_MAX_NUM = 1000
const getRandomDomainInitialBackgroundColorClass = () => {
  const randomBackgroundColorClassListIndex =
    Math.floor(Math.random() * RANDOM_MAX_NUM) %
    domainInitialBackgroundColorClassList.length

  return domainInitialBackgroundColorClassList[
    randomBackgroundColorClassListIndex
  ]
}

// PasswordItem Component - Start
const PasswordItem = props => {
  const {itemData, onItemDelete, revealPassword} = props
  const {
    id,
    domainName,
    username,
    password,
    domainInitialBackgroundColor,
  } = itemData
  const domainNameInitial = domainName.slice(0, 1).toUpperCase()

  const onPasswordDeleteAction = () => onItemDelete(id)

  return (
    <li className="password-item-container">
      <div className="password-item-content-container">
        <div className="password-item-domain-initial-container">
          <p
            className={`password-item-domain-initial  ${domainInitialBackgroundColor}`}
          >
            {domainNameInitial}
          </p>
        </div>

        <div className="password-item-data-container">
          <p className="domain-name">{domainName}</p>
          <p className="username">{username}</p>
          {revealPassword ? (
            <p className="password-text">{password}</p>
          ) : (
            <img
              className="password-stars-img"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
              alt="stars"
            />
          )}
        </div>
      </div>

      <button
        // testid="delete"
        type="button"
        className="password-item-delete-button"
        onClick={onPasswordDeleteAction}
      >
        <img
          className="password-item-delete-button-img"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
        />
      </button>
    </li>
  )
}

// PasswordItem Component - End

// PasswordManager Component - Start

class PasswordManager extends Component {
  state = {
    listOfPasswords: [],
    domainName: '',
    username: '',
    password: '',
    searchQuery: '',
    showPasswords: false,
  }

  addNewPasswordHandler = newPasswordData => {
    this.setState(previousPasswordManagerState => {
      const {listOfPasswords} = previousPasswordManagerState
      const updatedListOfPasswords = [newPasswordData, ...listOfPasswords]

      const updatedPasswordManagerState = {
        listOfPasswords: updatedListOfPasswords,
      }

      return updatedPasswordManagerState
    })
  }

  onDeletePassword = deletedPasswordEntryId => {
    this.setState(previousPasswordManagerState => {
      const {listOfPasswords} = previousPasswordManagerState
      const filteredListOfPasswords = listOfPasswords.filter(
        passwordDataEntry => passwordDataEntry.id !== deletedPasswordEntryId,
      )

      const updatedPasswordManagerState = {
        listOfPasswords: filteredListOfPasswords,
      }

      return updatedPasswordManagerState
    })
  }

  onDomainNameChange = domainChangeEvent => {
    const updatedDomainName = domainChangeEvent.target.value

    this.setState({
      domainName: updatedDomainName,
    })
  }

  onUsernameChange = usernameChangeEvent => {
    const updatedUsername = usernameChangeEvent.target.value

    this.setState({
      username: updatedUsername,
    })
  }

  onPasswordChange = passwordChangeEvent => {
    const updatedPassword = passwordChangeEvent.target.value

    this.setState({
      password: updatedPassword,
    })
  }

  onAddNewPassword = addNewPasswordEvent => {
    addNewPasswordEvent.preventDefault()

    const uniqueIdForNewPasswordEntry = uuidv4()
    const randomDomainInitialBackgroundColorClass = getRandomDomainInitialBackgroundColorClass()
    const newPasswordData = {
      id: uniqueIdForNewPasswordEntry,
      ...this.state,
      domainInitialBackgroundColor: randomDomainInitialBackgroundColorClass,
    }

    this.addNewPasswordHandler(newPasswordData)

    this.setState({
      domainName: '',
      username: '',
      password: '',
    })
  }

  onSearchQueryChange = searchQueryChangeEvent => {
    const updatedSearchQuery = searchQueryChangeEvent.target.value

    this.setState({
      searchQuery: updatedSearchQuery,
    })
  }

  onShowPasswords = showPasswordsEvent => {
    const isChecked = showPasswordsEvent.target.checked

    this.setState({
      showPasswords: isChecked,
    })
  }

  getFilteredPasswords = (searchInput, listOfPasswords) => {
    const filteredPasswords = listOfPasswords.filter(passwordDataEntry =>
      passwordDataEntry.domainName
        .toLowerCase()
        .includes(searchInput.toLowerCase()),
    )

    return filteredPasswords
  }

  render() {
    const {
      listOfPasswords,
      domainName,
      username,
      password,
      searchQuery,
      showPasswords,
    } = this.state
    const currentViewportWidth = window.innerWidth

    const filteredPasswords = this.getFilteredPasswords(
      searchQuery,
      listOfPasswords,
    )
    const noPasswords = filteredPasswords.length === 0

    return (
      <div className="password-manager-bg-container">
        <img
          className="brand-image"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
        />

        <div className="add-new-password-bg-container">
          <img
            className="add-new-password-img"
            src={
              currentViewportWidth < 768
                ? 'https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png'
                : 'https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png'
            }
            alt="password manager"
          />
          <form
            className="add-new-password-form-input-container"
            onSubmit={this.onAddNewPassword}
          >
            <h1 className="form-input-header">Add New Password</h1>
            <div className="form-input-container">
              <div className="form-input-img-container">
                <img
                  className="form-input-img"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                />
              </div>
              <input
                className="form-input"
                type="text"
                placeholder="Enter Website"
                onChange={this.onDomainNameChange}
                value={domainName}
              />
            </div>

            <div className="form-input-container">
              <div className="form-input-img-container">
                <img
                  className="form-input-img"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                />
              </div>
              <input
                className="form-input"
                type="text"
                placeholder="Enter Username"
                onChange={this.onUsernameChange}
                value={username}
              />
            </div>

            <div className="form-input-container">
              <div className="form-input-img-container">
                <img
                  className="form-input-img"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                />
              </div>
              <input
                className="form-input"
                type="password"
                placeholder="Enter Password"
                onChange={this.onPasswordChange}
                value={password}
              />
            </div>

            <button className="form-submit-button" type="submit">
              Add
            </button>
          </form>
        </div>

        <div className="password-collection-interface-bg-container">
          <div className="password-collection-interface-header">
            <div className="password-header-count-display-search-container">
              <div className="password-header-count-display-container">
                <h1 className="password-header-text">Your Passwords</h1>
                <p className="password-count">{filteredPasswords.length}</p>
              </div>

              <div className="password-search-container">
                <div className="password-search-icon-img-container">
                  <img
                    className="password-search-icon-img"
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                    alt="search"
                  />
                </div>
                <input
                  type="search"
                  className="password-search-input"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={this.onSearchQueryChange}
                />
              </div>
            </div>

            <hr className="horizontal-separator" />

            <div className="show-passwords-action-container">
              <input
                id="show-passwords"
                className="show-passwords-checkbox"
                type="checkbox"
                onChange={this.onShowPasswords}
              />
              <label htmlFor="show-passwords" className="show-passwords-label">
                Show Passwords
              </label>
            </div>
          </div>

          {noPasswords ? (
            <div className="no-passwords-content-container">
              <img
                className="no-passwords-img"
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
              />
              <p className="no-passwords-text">No Passwords</p>
            </div>
          ) : (
            <ul className="password-list">
              {filteredPasswords.map(filteredPasswordData => (
                <PasswordItem
                  key={filteredPasswordData.id}
                  itemData={filteredPasswordData}
                  onItemDelete={this.onDeletePassword}
                  revealPassword={showPasswords}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

// PasswordManager Component - End

// App component to render as the root component
const App = () => <PasswordManager />

export default App
