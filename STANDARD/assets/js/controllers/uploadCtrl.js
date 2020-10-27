'use strict';
/** 
 * controllers for Angular File Upload
 */
app.controller('UploadCtrl', [
    '$rootscope',
    '$scope',
    'FileUploader',
    function($rootscope, $scope, FileUploader) {
        var uploaderImages = ($scope.uploaderImages = new FileUploader({
            url: `api/upload/upload.php?client=${JSON.parse($rootScope.d.datos).database}`
        }));

        // FILTERS

        uploaderImages.filters.push({
            name: 'imageFilter',
            fn: function(item /*{File|FileLikeObject}*/ , options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        });

        // CALLBACKS

        uploaderImages.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/ , filter, options) {
            console.info('onWhenAddingFileFailed', item, filter, options);
        };
        uploaderImages.onAfterAddingFile = function(fileItem) {
            console.info('onAfterAddingFile', fileItem);
        };
        uploaderImages.onAfterAddingAll = function(addedFileItems) {
            console.info('onAfterAddingAll', addedFileItems);
        };
        uploaderImages.onBeforeUploadItem = function(item) {
            console.info('onBeforeUploadItem', item);
        };
        uploaderImages.onProgressItem = function(fileItem, progress) {
            console.info('onProgressItem', fileItem, progress);
        };
        uploaderImages.onProgressAll = function(progress) {
            console.info('onProgressAll', progress);
        };
        uploaderImages.onSuccessItem = function(fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
        };
        uploaderImages.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };
        uploaderImages.onCancelItem = function(fileItem, response, status, headers) {
            console.info('onCancelItem', fileItem, response, status, headers);
        };
        uploaderImages.onCompleteItem = function(fileItem, response, status, headers) {
            console.info('onCompleteItem', fileItem, response, status, headers);
        };
        uploaderImages.onCompleteAll = function() {
            console.info('onCompleteAll');
        };

        console.info('uploader', uploaderImages);
    }
]);

app.controller('UploadCtrl2', [
    '$rootScope',
    '$scope',
    'FileUploader',
    '$q',
    '$http',
    function($rootScope, $scope, FileUploader, $q, $http) {

        $scope.getCertificadoInfomation = function() {
            var deferred = $q.defer();
            $http({
                url: `api/mantenimiento/mantenimiento/read.php?getdb=${JSON.parse($rootScope.d.datos).database}&tbnom=empresa&where=emp_id&igual=${JSON.parse($rootScope.d.datos).emp_id}`,
                method: 'post',
            }).then(
                function(response) {
                    deferred.resolve(response.data.data[0]);
                },
                function(error) {
                    deferred.reject(error);
                }
            );
            return deferred.promise;
        }

        $scope.infoCertificado = $scope.getCertificadoInfomation().then(function(response){ return response});
        


        $scope.passwordCertificado = '';
        var uploader = ($scope.uploader = new FileUploader({
            url: `api/upload/upload.php?client=${JSON.parse($rootScope.d.datos).database}&emp_id=${JSON.parse($rootScope.d.datos).emp_id}`
        }));

        uploader.filters.push({
            name: 'queueLimit',
            fn: function(item /*{File|FileLikeObject}*/ , options) {
                return this.queue.length < 1;
            }
        });

        $scope.cargarArchivo = function(up, clave) {
            up.uploadAll();

            var deferred = $q.defer();
            $http({
                url: `api/mantenimiento/mantenimiento/update.php`,
                method: 'post',
                data: {
                    credenciales: {
                        tbnom: 'empresa',
                        getdb: JSON.parse($rootScope.d.datos).database,
                    },
                    typeUpdate: 'unique',
                    identifiquer: {
                        ID: 'emp_id',
                        VALUE: JSON.parse($rootScope.d.datos).emp_id,
                    },
                    toUpdate: {
                        fe_cercla: clave
                    }
                }
            }).then(
                function(response) {
                    deferred.resolve(response);
                },
                function(error) {
                    deferred.reject(error);
                }
            );
            return deferred.promise;
        };
    }
]);