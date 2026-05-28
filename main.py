import re

from flask import Blueprint, flash, redirect, render_template, request, url_for

main = Blueprint('main_blueprint', __name__)

EMAIL_RE = re.compile(r'^[^@\s]+@[^@\s]+\.[^@\s]+$')

EMPTY_FORM = {
    'name': '',
    'email': '',
    'subject': '',
    'message': '',
}


@main.route('/', methods=['GET', 'POST'])
def index():
    form_data = dict(EMPTY_FORM)

    if request.method == 'POST':
        form_data = {
            'name': request.form.get('name', '').strip(),
            'email': request.form.get('email', '').strip(),
            'subject': request.form.get('subject', '').strip(),
            'message': request.form.get('message', '').strip(),
        }

        errors = []
        if not form_data['name']:
            errors.append('Name is required.')
        if not form_data['email']:
            errors.append('Email is required.')
        elif not EMAIL_RE.match(form_data['email']):
            errors.append('Please enter a valid email address.')
        if not form_data['message']:
            errors.append('Message is required.')

        if errors:
            for error in errors:
                flash(error, 'error')
            return render_template('index.html', form_data=form_data), 400

        flash('Thanks! Your message has been sent.', 'success')
        return redirect(url_for('main_blueprint.index') + '#contact')

    return render_template('index.html', form_data=form_data)
