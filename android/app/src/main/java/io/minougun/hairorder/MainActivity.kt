package io.minougun.hairorder

import android.Manifest
import android.content.ActivityNotFoundException
import android.content.Intent
import android.content.pm.PackageManager
import android.net.Uri
import android.os.Bundle
import android.webkit.GeolocationPermissions
import android.webkit.ValueCallback
import android.webkit.WebChromeClient
import android.webkit.WebResourceRequest
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.ProgressBar
import androidx.activity.addCallback
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat

class MainActivity : AppCompatActivity() {
  companion object {
    private const val BASE_URL = "https://minougun.github.io/hair-order/"
  }

  private lateinit var webView: WebView
  private lateinit var loading: ProgressBar

  private var fileChooserCallback: ValueCallback<Array<Uri>>? = null
  private var geoOrigin: String? = null
  private var geoCallback: GeolocationPermissions.Callback? = null

  private val filePickerLauncher = registerForActivityResult(
    ActivityResultContracts.StartActivityForResult()
  ) { result ->
    val callback = fileChooserCallback
    fileChooserCallback = null

    if (callback == null) return@registerForActivityResult
    val uris = WebChromeClient.FileChooserParams.parseResult(result.resultCode, result.data)
    callback.onReceiveValue(uris)
  }

  private val requestLocationPermissionLauncher = registerForActivityResult(
    ActivityResultContracts.RequestMultiplePermissions()
  ) { grantResults ->
    val granted =
      grantResults[Manifest.permission.ACCESS_FINE_LOCATION] == true ||
      grantResults[Manifest.permission.ACCESS_COARSE_LOCATION] == true

    geoCallback?.invoke(geoOrigin, granted, false)
    geoOrigin = null
    geoCallback = null
  }

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setContentView(R.layout.activity_main)

    webView = findViewById(R.id.webview)
    loading = findViewById(R.id.loading)

    configureWebView()

    onBackPressedDispatcher.addCallback(this) {
      if (webView.canGoBack()) {
        webView.goBack()
      } else {
        finish()
      }
    }

    if (savedInstanceState == null) {
      webView.loadUrl(BASE_URL)
    } else {
      webView.restoreState(savedInstanceState)
    }
  }

  private fun configureWebView() {
    with(webView.settings) {
      javaScriptEnabled = true
      domStorageEnabled = true
      databaseEnabled = true
      setGeolocationEnabled(true)
      allowContentAccess = true
      allowFileAccess = true
      cacheMode = WebSettings.LOAD_DEFAULT
      mediaPlaybackRequiresUserGesture = false
    }

    webView.webViewClient = object : WebViewClient() {
      override fun shouldOverrideUrlLoading(view: WebView?, request: WebResourceRequest?): Boolean {
        val uri = request?.url ?: return false
        val scheme = uri.scheme ?: return false

        return if (scheme == "http" || scheme == "https") {
          false
        } else {
          startActivity(Intent(Intent.ACTION_VIEW, uri))
          true
        }
      }

      override fun onPageFinished(view: WebView?, url: String?) {
        super.onPageFinished(view, url)
        loading.visibility = ProgressBar.GONE
      }
    }

    webView.webChromeClient = object : WebChromeClient() {
      override fun onProgressChanged(view: WebView?, newProgress: Int) {
        if (newProgress >= 100) {
          loading.visibility = ProgressBar.GONE
        } else {
          loading.visibility = ProgressBar.VISIBLE
        }
      }

      override fun onShowFileChooser(
        webView: WebView?,
        filePathCallback: ValueCallback<Array<Uri>>?,
        fileChooserParams: FileChooserParams?
      ): Boolean {
        fileChooserCallback?.onReceiveValue(null)
        fileChooserCallback = filePathCallback

        val intent = try {
          fileChooserParams?.createIntent()
        } catch (_: Exception) {
          null
        } ?: Intent(Intent.ACTION_GET_CONTENT).apply {
          addCategory(Intent.CATEGORY_OPENABLE)
          type = "image/*"
          putExtra(Intent.EXTRA_ALLOW_MULTIPLE, true)
        }

        return try {
          filePickerLauncher.launch(intent)
          true
        } catch (_: ActivityNotFoundException) {
          fileChooserCallback = null
          false
        }
      }

      override fun onGeolocationPermissionsShowPrompt(
        origin: String?,
        callback: GeolocationPermissions.Callback?
      ) {
        if (origin == null || callback == null) {
          callback?.invoke(origin, false, false)
          return
        }

        val fineGranted = ContextCompat.checkSelfPermission(
          this@MainActivity,
          Manifest.permission.ACCESS_FINE_LOCATION
        ) == PackageManager.PERMISSION_GRANTED
        val coarseGranted = ContextCompat.checkSelfPermission(
          this@MainActivity,
          Manifest.permission.ACCESS_COARSE_LOCATION
        ) == PackageManager.PERMISSION_GRANTED

        if (fineGranted || coarseGranted) {
          callback.invoke(origin, true, false)
          return
        }

        geoOrigin = origin
        geoCallback = callback
        requestLocationPermissionLauncher.launch(
          arrayOf(
            Manifest.permission.ACCESS_FINE_LOCATION,
            Manifest.permission.ACCESS_COARSE_LOCATION
          )
        )
      }
    }
  }

  override fun onSaveInstanceState(outState: Bundle) {
    super.onSaveInstanceState(outState)
    webView.saveState(outState)
  }

  override fun onDestroy() {
    fileChooserCallback?.onReceiveValue(null)
    fileChooserCallback = null
    geoOrigin = null
    geoCallback = null

    webView.apply {
      stopLoading()
      destroy()
    }

    super.onDestroy()
  }
}
