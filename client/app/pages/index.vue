<template>
  <main class="">
    <!-- header section -->
    <section></section>

    <!-- video section -->
    <section class="video-section"></section>

    <div style="margin: 100px 0">
      <hr />
      <h2 style="text-align: center">Songs List</h2>
      <hr />
    </div>

    <!-- songs section -->
    <section>
      <template id="card-template">
        <article class="card">
          <div class="song">
            <h3 class="title"></h3>
            <img class="img" src="" alt="" />
            <audio class="audio" hidden src=""></audio>
            <p class="text"></p>
          </div>
        </article>
      </template>
      <!-- grid-template -->
      <div class="container">
        <div class="grid" id="grid-template"></div>
      </div>
    </section>
  </main>
</template>
