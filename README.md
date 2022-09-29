# WEINRE for Openshift 4

This repository consists of a build of Weinre, which has been adapted for deployment to Openshift 4.

* The deployable code is in `apache-cordova-weinre-2.0.0-pre-L88LN7XR-bin`.
* Documentation can be found in `apache-cordova-weinre-2.0.0-pre-L88LN7XR-doc`.

## Openshift Deployment

### Initialise new application
1. Click `Add+` from left menu
2. Select `Create Project` from top menu and fill in the form
1. Select `Import from Git`
2. Select "Builder Image" `Node.js`
3. Configure as below

### Configuration

1. Type: `Source` (Build strategy. Might have been set automatically when selecting `Import from Git`)
1. Git repository: `https://github.com/perqa/weinre-build.git`
1. Git ref: `main` (ref is the branch/tag/ref to build.)
1. Context dir: `apache-cordova-weinre-2.0.0-pre-L88LN7XR-bin` (contextDir specifies the sub-directory where the source code for the application exists)



