package com.github.fernthedev.random_vocab

import com.google.gson.Gson
import okhttp3.OkHttpClient
import okhttp3.Request
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.io.IOException
import java.time.temporal.ChronoUnit
import java.time.temporal.TemporalUnit
import java.util.*
import kotlin.collections.ArrayList
import kotlin.collections.HashMap


@RequestMapping("/api")
@RestController
class DictionaryRestfulController {

    private val client = OkHttpClient()

    companion object {
        val words: MutableList<String> = ArrayList()
    }

    @GetMapping("/randomWord")
    fun getRandomWord(): ResponseEntity<String> {
        return try {
            val max = getWords().size - 1

            val wordDef = getWords()[Random().nextInt(max)]


            ResponseEntity.ok(wordDef)
        } catch (e: ResponseException) {
            e.printStackTrace()

            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.localizedMessage)
        }
    }

    @GetMapping("/getWord/{value}")
    fun getWordData(@PathVariable("value") word: String): ResponseEntity<*> {
        return try {
            val wordDef = Constants.getLinkForWordDictionary(word)
            val wordThesaurus = Constants.getLinkForWordThesaurus(word)

            ResponseEntity.ok(LinkResponse(wordDef, wordThesaurus))
        } catch (e: ResponseException) {
            e.printStackTrace()

            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.localizedMessage)
        }
    }



    @Throws(ResponseException::class, IOException::class)
    private fun getWords(): List<String> {
        if (words.isNotEmpty()) {
            return words;
        }

        words.addAll(readUrl(Constants.RANDOM_WORDS))

        return words;
    }

    @Throws(IOException::class)
    private fun readUrl(url: String): List<String> {
        val request = Request.Builder()
                .url(url)
                .build()
        val strings: MutableList<String> = ArrayList()

        client.newCall(request).execute().use { response ->

            if (!response.isSuccessful)
                throw ResponseException(response)

            response.body!!.source().use { source ->
                while (true) {
                    val line = source.readUtf8Line() ?: break
                    strings.add(line)
                }
            }

        }
        return strings
    }


}