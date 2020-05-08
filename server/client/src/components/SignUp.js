<form onSubmit={event => {this.handleSignUp(event)}}>
            <div>
              <label>Username:</label>
                <input type="text" name="username" onChange= {event => this.setState({newUsername: event.target.value})}/>
            </div>
            <br />
            <div>
              <label>Password:</label>
              <input type="password" name="password" onChange= {event => this.setState({newPassword: event.target.value})}/>
            </div>
            <br />
            <div>
              <Button variant="dark" type="submit" value="Log In">Sign Up</Button>
            </div>
          </form>


<form onSubmit={event => this.handleAddGroup(event)}>
<div>
  <label>Group Name:</label>
  <input type="group-name" name="group-name" onChange= {event => this.setState({groupName: event.target.value})}/>
</div>
<div>
  <button type="submit" value="add-group">Add Group</button>
</div>
</form>