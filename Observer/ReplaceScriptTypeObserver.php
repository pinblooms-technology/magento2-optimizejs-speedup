<?php

namespace PinBlooms\OptimizeJs\Observer;

use Magento\Framework\Event\Observer;
use Magento\Framework\Event\ObserverInterface;

class ReplaceScriptTypeObserver implements ObserverInterface
{
    /**
     * Modify the response body to replace script type
     *
     * @param Observer $observer
     * @return void
     */
    public function execute(Observer $observer)
    {
        /** @var \Magento\Framework\App\Response\Http $response */
        $response = $observer->getResponse();

        // Get the response body
        $body = $response->getBody();

        // Replace type="text/javascript" with type="lazyload_int"
        $modifiedBody = preg_replace('/type\s*=\s*"text\/javascript"/i', 'type="lazyload_int"', $body);

        // Set the modified content back to the response
        $response->setBody($modifiedBody);
    }
}
