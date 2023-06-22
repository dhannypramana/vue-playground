<template>
  <div id="wrapper">
    <!-- Sidebar -->
    <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

      <!-- Sidebar - Brand -->
      <div class="sidebar-brand d-flex align-items-center justify-content-center">
        <img class="sidebar-brand" src="./assets/images/vue.png" alt="vue_Logo">
        <div class="sidebar-brand-text">VueJS Playground</div>
      </div>

      <!-- Divider -->
      <hr class="sidebar-divider">

      <!-- Nav Item - Dashboard -->
      <li class="nav-item">
        <RouterLink
            :to="{ name: 'home' }"
            class="nav-link">
          <span><IconTooling/></span>
          <span class="ms-3">Home</span>
        </RouterLink>
        <hr class="sidebar-divider">
      </li>
      <li class="nav-item">
        <RouterLink
            :to="{ name: 'projects' }"
            class="nav-link">
          <span><IconDocumentation/></span>
          <span class="ms-3">Projects</span>
        </RouterLink>
      <hr class="sidebar-divider">
      </li>
      <li class="nav-item">
        <RouterLink
            :to="{ name: 'learn' }"
            class="nav-link">
          <span><IconSupport/></span>
          <span class="ms-3">Learn</span>
        </RouterLink>
      <hr class="sidebar-divider">
      </li>
      <li class="nav-item">
        <RouterLink
            :to="{ name: 'playground' }"
            class="nav-link">
          <span><IconEcosystem/></span>
          <span class="ms-3">Playground</span>
        </RouterLink>
      <hr class="sidebar-divider">
      </li>
    </ul>

    <!-- Content Wrapper -->
    <div id="content-wrapper" class="d-flex flex-column">
      <!-- Main Content -->
      <div id="content">
        <!-- Topbar -->
        <nav class="navbar sticky-top navbar-expand navbar-light bg-white topbar mb-4 shadow">
          <!-- Topbar Navbar -->
          <ul class="navbar-nav ml-auto">
            <!-- Nav Item - User Information -->
            <li class="nav-item dropdown no-arrow">
              <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                 data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span class="mr-2 d-none d-lg-inline text-gray-600 small">Dhanny Adhi Pramana</span>
                <img class="img-profile rounded-circle" src="./assets/images/dani.png" alt="profile_Photo">
              </a>
            </li>
          </ul>
        </nav>
        <!-- End of Topbar -->

        <!-- Begin Page Content -->
        <div class="container-fluid">
          <div class="mx-4 my-5">
            <RouterView/>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <footer class="sticky-footer bg-white">
        <div class="container my-auto">
          <div class="copyright text-center my-auto">
            <span>Copyright &copy; Dhanny Adhi Pramana | VueJS Playground 2023</span>
          </div>
        </div>
      </footer>
      <!-- End of Footer -->
    </div>
    <!-- End of Content Wrapper -->
  </div>
</template>

<script setup>
import IconTooling from "@/components/icons/IconTooling.vue";
import IconDocumentation from "@/components/icons/IconDocumentation.vue";
import IconSupport from "@/components/icons/IconSupport.vue";
import IconEcosystem from "@/components/icons/IconEcosystem.vue";
</script>