import { Injectable } from '@angular/core';

@Injectable()
export class MESSAGES {
  success = {
    'forgot_password': 'Please check your email for instruction.',
    'reset_password': 'Password updated successfully',
    'create_contact': 'Thanks for contacting us! We will get in touch with you shortly.',
    'update_user': 'Profile successfully updated',
    'change_password': 'Password successfully updated',
    'create_listing': 'Listing successfully created.',
    'update_search_settings': 'Search settings successfully updated.',
    'upload_photo': 'Successfully uploaded photo(s)',
    'upload_video': 'Successfully uploaded video',
    'update_listing': 'Listing successfully updated'   
  };

  error = {
    'reset_password': 'Your password reset link appears to be invalid.',
    'nda_signed': 'NDA has already been signed',
  }
}
