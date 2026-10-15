package com.pyoda.galaxydefense;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.graphics.Color;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.view.View;
import android.view.WindowInsets;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.FrameLayout;
import androidx.webkit.WebViewAssetLoader;

public final class MainActivity extends Activity {
    private WebView web;
    private static final String HOME = "https://appassets.androidplatform.net/assets/index.html";

    @Override public void onCreate(Bundle state) {
        super.onCreate(state);
        if (Build.VERSION.SDK_INT >= 30) getWindow().setDecorFitsSystemWindows(false);
        if (Build.VERSION.SDK_INT >= 33) getOnBackInvokedDispatcher().registerOnBackInvokedCallback(android.window.OnBackInvokedDispatcher.PRIORITY_DEFAULT, this::handleBack);
        FrameLayout root = new FrameLayout(this);
        root.setBackgroundColor(Color.rgb(16,21,31));
        web = new WebView(this);
        web.setBackgroundColor(Color.rgb(16,21,31));
        root.addView(web, new FrameLayout.LayoutParams(-1,-1));
        setContentView(root);
        root.setOnApplyWindowInsetsListener((view,insets) -> {
            if (Build.VERSION.SDK_INT >= 30) {
                android.graphics.Insets safe = insets.getInsets(WindowInsets.Type.systemBars() | WindowInsets.Type.displayCutout() | WindowInsets.Type.ime());
                view.setPadding(safe.left,safe.top,safe.right,safe.bottom);
            } else {
                view.setPadding(0,0,0,0);
            }
            return insets;
        });
        root.requestApplyInsets();
        WebSettings settings = web.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setAllowFileAccess(false);
        settings.setAllowContentAccess(false);
        settings.setMixedContentMode(WebSettings.MIXED_CONTENT_NEVER_ALLOW);
        settings.setMediaPlaybackRequiresUserGesture(true);
        web.setOverScrollMode(View.OVER_SCROLL_NEVER);
        web.setWebChromeClient(new WebChromeClient());
        WebView.setWebContentsDebuggingEnabled(BuildConfig.DEBUG);
        final WebViewAssetLoader loader = new WebViewAssetLoader.Builder()
            .addPathHandler("/assets/", new WebViewAssetLoader.AssetsPathHandler(this)).build();
        web.setWebViewClient(new WebViewClient() {
            @Override public WebResourceResponse shouldInterceptRequest(WebView view,WebResourceRequest request) {
                return loader.shouldInterceptRequest(request.getUrl());
            }
            @Override public boolean shouldOverrideUrlLoading(WebView view,WebResourceRequest request) {
                Uri url=request.getUrl();
                if ("https".equals(url.getScheme()) && "appassets.androidplatform.net".equals(url.getHost())) return false;
                if ("https".equals(url.getScheme()) || "mailto".equals(url.getScheme())) {
                    try { startActivity(new Intent(Intent.ACTION_VIEW,url)); } catch(ActivityNotFoundException ignored) { }
                }
                return true;
            }
        });
        if (state != null) web.restoreState(state); else web.loadUrl(HOME);
    }
    @Override public void onBackPressed() { handleBack(); }
    private void handleBack() {
        if (web == null) { super.onBackPressed(); return; }
        if (web.getUrl()!=null && web.getUrl().endsWith("privacy.html")) { web.loadUrl(HOME); return; }
        web.evaluateJavascript("(function(){var o=document.getElementById('overlay');if(o&&o.classList.contains('hidden')){document.getElementById('pause').click();return 'handled';}var g=document.querySelector('.game-options');if(g&&!g.hidden){document.getElementById('reselect').click();return 'handled';}return 'exit';})()", value -> {
            if (!"\"handled\"".equals(value)) new AlertDialog.Builder(this).setMessage("게임을 종료할까요?")
                .setPositiveButton("종료",(d,w)->finish()).setNegativeButton("계속하기",null).show();
        });
    }
    @Override protected void onPause(){ if(web!=null){web.evaluateJavascript("if(document.getElementById('overlay')?.classList.contains('hidden'))document.getElementById('pause').click();",null);web.onPause();}super.onPause(); }
    @Override protected void onResume(){super.onResume();if(web!=null)web.onResume();}
    @Override protected void onSaveInstanceState(Bundle state){super.onSaveInstanceState(state);if(web!=null)web.saveState(state);}
    @Override protected void onDestroy(){if(web!=null){web.destroy();web=null;}super.onDestroy();}
}
