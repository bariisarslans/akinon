package com.akinonproj;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

import com.facebook.react.ReactActivity;

import euromsg.com.euromobileandroid.model.Message;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "akinonProj";
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    // setContentView(R.layout.activity_main);
    Intent intent = getIntent();
    if(intent != null) {
      if(intent.hasExtra("message")) {
        Message message = (Message) intent.getSerializableExtra("message");
        Log.e("message title : ", message.getTitle());
      }
    }

  }
}
